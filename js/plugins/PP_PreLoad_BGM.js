//=============================================================================
// PP_PreLoad_BGM.js
//
// Copyright (c) 2020 punipunion
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc BGMを手動プリロードするプラグインです。
 * @help 使い方
 * 1. マップに並列処理でイベントを置いておき、下記プラグインコマンドでBGMをプリロードします。
 *    PRELOAD_BGM 名前 音量 ピッチ 位相
 *    例：PRELOAD_BGM Battle3 100 100 0
 * 
 *    ※音量以降を省略した場合、プラグインパラメータのデフォルト値が使われます。
 *    例：「PRELOAD_BGM Battle3」は「PRELOAD_BGM Battle3 90 0 0」と同じ。
 * 
 * 2. 下記プラグインコマンドでプリロードしたBGMを再生します。
 *    PLAY_PRELOAD_BGM 再生位置(秒)
 *    例(曲の初めから再生)：PLAY_PRELOAD_BGM
 *    例(0.5秒から再生)：PLAY_PRELOAD_BGM 0.5
 *    ※秒を指定しなかった場合、最初(0)から再生します。
 * 
 * 注意点
 * ・並列処理のイベントでプラグインコマンドを実行した場合、イベントの一時消去でイベントを削除ください。
 * ・プラグインコマンドのみで指定したBGMは、デプロイメントの「未使用ファイルを含まない」で除外されるので、
 * 　手動でコピーするかプラグインパラメータに指定ください。
 * 
 * @param VolumeDefault
 * @desc 音量を指定しなかったときのデフォルト値です。
 * @default 90
 * 
 * @param PitchDefault
 * @desc ピッチを指定しなかったときのデフォルト値です。
 * @default 100
 * 
 * @param PanDefault
 * @desc 位相を指定しなかったときのデフォルト値です。
 * @default 0
 * 
 * @param AudioFiles
 * @desc デプロイメントの「未使用ファイルを含まない」の対象外ファイルを指定します。
 * @default
 * @require 1
 * @dir audio/
 * @type file[]
 * 
 * @author punipunion
 */

(function () {
    'use strict';

    var parameters = PluginManager.parameters('PP_PreLoad_BGM');
    var VolumeDefault = parseInt(parameters['VolumeDefault']);
    var PitchDefault = parseInt(parameters['PitchDefault']);
    var PanDefault = parseInt(parameters['PanDefault']);

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);

        switch (command) {
            case 'PRELOAD_BGM':
                if (args[0]) {
                    var bgm = { 'name': args[0] };

                    if (args[1]) {
                        bgm.volume = parseInt(args[1]);
                    } else {
                        bgm.volume = VolumeDefault;
                    }

                    if (args[2]) {
                        bgm.pitch = parseInt(args[2]);
                    } else {
                        bgm.pitch = PitchDefault;
                    }

                    if (args[3]) {
                        bgm.pan = parseInt(args[3]);
                    } else {
                        bgm.pan = PanDefault;
                    }

                    AudioManager.preLoadBgm(bgm, 0);
                } else {
                    throw new Error('PRELOAD_BGM パラメーターエラー 名前が指定されていません args：' + args.toString());
                }
                break;
            case 'PLAY_PRELOAD_BGM':
                if (args[0]) {
                    AudioManager.playPreLoadBgm(parseFloat(args[0]));
                } else {
                    AudioManager.playPreLoadBgm(0);
                }
                break;
            case 'CLEAR_PRELOAD_BGM':
                AudioManager.clearPreLoadBgm();
                break;
        }
    };

    AudioManager._preLoadBuffer = null;
    AudioManager._preLoadBgm = null;

    // BGMプリロード
    AudioManager.preLoadBgm = function(bgm, pos) {
        if (bgm.name) { 
            if(Decrypter.hasEncryptedAudio && this.shouldUseHtml5Audio()){
                this.preLoadEncryptedBgm(bgm, pos);
            }
            else {
                this._preLoadBuffer = this.createBuffer('bgm', bgm.name);
                this._preLoadBgm = bgm;
                this.updatePreLoadBgmParameters(bgm);
                /*if (!this._meBuffer) {
                    this._bgmBuffer.play(true, pos || 0);
                }*/
            }
        }
    };

    // プリロードBGMのパラメータ設定
    AudioManager.updatePreLoadBgmParameters = function(bgm) {
        this.updateBufferParameters(this._preLoadBuffer, this._bgmVolume, bgm);
    };

    // プリロードBGM再生
    AudioManager.playPreLoadBgm = function(pos) {
        if (this._preLoadBuffer) {
            if (this.isCurrentBgm(this._preLoadBgm)) {
                this.updateBgmParameters(this._preLoadBgm);
            } else {
                this.stopBgm();
            
                this._bgmBuffer = this._preLoadBuffer;
                this._bgmBuffer.play(true, pos || 0);
                this.updateCurrentBgm(this._preLoadBgm, pos);
            }

            this._preLoadBuffer = null;
            this._preLoadBgm = null;
        }
    };

    // プリロードBGMクリア
    AudioManager.clearPreLoadBgm = function() {
        this._preLoadBuffer = null;
        this._preLoadBgm = null;
    };

    // 暗号化読み込み
    AudioManager.preLoadEncryptedBgm = function(bgm, pos) {
        var ext = this.audioFileExt();
        var url = this._path + 'bgm/' + encodeURIComponent(bgm.name) + ext;
        url = Decrypter.extToEncryptExt(url);
        Decrypter.decryptHTML5AudioPreLoad(url, bgm, pos);
    };

    // 復号
    Decrypter.decryptHTML5AudioPreLoad = function(url, bgm, pos) {
        var requestFile = new XMLHttpRequest();
        requestFile.open("GET", url);
        requestFile.responseType = "arraybuffer";
        requestFile.send();
    
        requestFile.onload = function () {
            if(this.status < Decrypter._xhrOk) {
                var arrayBuffer = Decrypter.decryptArrayBuffer(requestFile.response);
                var url = Decrypter.createBlobUrl(arrayBuffer);
                AudioManager.createDecryptPreLoadBuffer(url, bgm, pos);
            }
        };
    };
    
    // 暗号化再生
    AudioManager.createDecryptPreLoadBuffer = function(url, bgm, pos){
        this._blobUrl = url;
        this._preLoadBuffer = this.createBuffer('bgm', bgm.name);
        this._preLoadBgm = bgm;
        this.updatePreLoadBgmParameters(bgm);
        /*if (!this._meBuffer) {
            this._bgmBuffer.play(true, pos || 0);
        }
        this.updateCurrentBgm(bgm, pos);*/
    };

})();