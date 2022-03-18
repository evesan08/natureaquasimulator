//============================================================================
// IZ_TextGaugeColor.js
// ---------------------------------------------------------------------------
// Copyright (c) 2018 IZ
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ---------------------------------------------------------------------------
//============================================================================

//============================================================================
/*:
* @plugindesc v1.0 文字色やHP、MP、TPゲージの色を変更します。
*
* @author いず
* @help このプラグインにはプラグインコマンドはありません。
*
* @param == Text Color ==
* @desc
* @default
*
* @param NormalTextColor
* @desc 普通の文字の色
* 初期値: 0
* @default 0
*
* @param SystemTextColor
* @desc システム文字の色
* 初期値: 16
* @default 16
*
* @param CrisisTextColor
* @desc ピンチ時の文字色
* 初期値: 17
* @default 17
*
* @param DeathTextColor
* @desc 戦闘不能時の文字色
* 初期値: 18
* @default 18
*
* @param MpCostColor
* @desc 消費MP量の文字色
* 初期値: 23
* @default 23
*
* @param TpCostColor
* @desc 消費TP量の文字色
* 初期値: 29
* @default 29
*
* @param PowerUpColor
* @desc パワーアップ時に表示される文字色
* 初期値: 24
* @default 24
*
* @param PowerDownColor
* @desc パワーダウン時に表示される文字色
* 初期値: 25
* @default 25
*
* @param == Gauge Color ==
* @desc
* @default
*
* @param GaugeBackColor
* @desc ゲージの背景色
* 初期値: 19
* @default 19
*
* @param HpGaugeColor1
* @desc HPゲージの色1
* 初期値: 20
* @default 20
*
* @param HpGaugeColor2
* @desc HPゲージの色2
* 初期値: 21
* @default 21
*
* @param MpGaugeColor1
* @desc HPゲージの色1
* 初期値: 22
* @default 22
*
* @param MpGaugeColor2
* @desc HPゲージの色2
* 初期値: 23
* @default 23
*
* @param TpGaugeColor1
* @desc TPゲージの色１
* 初期値: 28
* @default 28
*
* @param TpGaugeColor2
* @desc TPゲージの色2
* 初期値: 29
* @default 29
*
*
*/


(function() {

    'use strict';

    var parameters = PluginManager.parameters('IZ_TextGaugeColor');

    var NormalTextColor = Number(parameters['NormalTextColor'] || 0);
    var SystemTextColor = Number(parameters['SystemTextColor'] || 16);
    var CrisisTextColor = Number(parameters['CrisisTextColor'] || 17);
    var DeathTextColor = Number(parameters['DeathTextColor'] || 18);
    var MpCostColor = Number(parameters['MpCostColor'] || 23);
    var TpCostColor = Number(parameters['TpCostColor'] || 29);
    var PowerUpColor = Number(parameters['PowerUpColor'] || 24);
    var PowerDownColor = Number(parameters['PowerDownColor'] || 25);

    var GaugeBackColor = Number(parameters['GaugeBackColor'] || 19);
    var HPGaugeColor1 = Number(parameters['HpGaugeColor1'] || 20);
    var HPGaugeColor2 = Number(parameters['HpGaugeColor2'] || 21);
    var MPGaugeColor1 = Number(parameters['MpGaugeColor1'] || 22);
    var MPGaugeColor2 = Number(parameters['MpGaugeColor2'] || 23);
    var TPGaugeColor1 = Number(parameters['TpGaugeColor1'] || 28);
    var TPGaugeColor2 = Number(parameters['TpGaugeColor2'] || 29);


    var _Window_Base_normalColor = Window_Base.prototype.normalColor;
    Window_Base.prototype.normalColor = function () {
        return this.textColor(NormalTextColor);
    };

    var _Window_Base_systemColor = Window_Base.prototype.systemColor;
    Window_Base.prototype.systemColor = function () {
        return this.textColor(SystemTextColor);
    };

    var _Window_Base_crisisColor = Window_Base.prototype.crisisColor;
    Window_Base.prototype.crisisColor = function () {
        return this.textColor(CrisisTextColor);
    };

    var _Window_Base_deathColor = Window_Base.prototype.deathColor;
    Window_Base.prototype.deathColor = function () {
        return this.textColor(DeathTextColor);
    };

    var _Window_Base_gaugeBackColor = Window_Base.prototype.gaugeBackColor;
    Window_Base.prototype.gaugeBackColor = function () {
        return this.textColor(GaugeBackColor);
    };

    var _Window_Base_hpGaugeColor1 = Window_Base.prototype.hpGaugeColor1;
    Window_Base.prototype.hpGaugeColor1 = function () {
        return this.textColor(HPGaugeColor1);
    };

    var _Window_Base_hpGaugeColor2 = Window_Base.prototype.hpGaugeColor2;
    Window_Base.prototype.hpGaugeColor2 = function () {
        return this.textColor(HPGaugeColor2);
    };

    var _Window_Base_mpGaugeColor1 = Window_Base.prototype.mpGaugeColor1;
    Window_Base.prototype.mpGaugeColor1 = function () {
        return this.textColor(MPGaugeColor1);
    };

    var _Window_Base_mpGaugeColor2 = Window_Base.prototype.mpGaugeColor2;
    Window_Base.prototype.mpGaugeColor2 = function () {
        return this.textColor(MPGaugeColor2);
    };

    var _Window_Base_mpCostColor = Window_Base.prototype.mpCostColor;
    Window_Base.prototype.mpCostColor = function () {
        return this.textColor(MpCostColor);
    };

    var _Window_Base_powerUpColor = Window_Base.prototype.powerUpColor;
    Window_Base.prototype.powerUpColor = function () {
        return this.textColor(PowerUpColor);
    };

    var _Window_Base_powerDownColor = Window_Base.prototype.powerDownColor;
    Window_Base.prototype.powerDownColor = function () {
        return this.textColor(PowerDownColor);
    };

    var _Window_Base_tpGaugeColor1 = Window_Base.prototype.tpGaugeColor1;
    Window_Base.prototype.tpGaugeColor1 = function () {
        return this.textColor(TPGaugeColor1);
    };

    var _Window_Base_tpGaugeColor2 = Window_Base.prototype.tpGaugeColor2;
    Window_Base.prototype.tpGaugeColor2 = function () {
        return this.textColor(TPGaugeColor2);
    };

    var _Window_Base_tpCostColor = Window_Base.prototype.tpCostColor;
    Window_Base.prototype.tpCostColor = function () {
        return this.textColor(TpCostColor);
    };


})();