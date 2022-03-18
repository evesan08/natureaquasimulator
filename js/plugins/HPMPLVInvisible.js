
/*
HPMPLVInvisible.js

2016/9/15 version 1.1

更新履歴
2016/9/15　経験値表示も消すように変更

  利用規約
　・MITライセンスに準じます。
  ・商用・非商用問わず使えます。
　・改変公開可能

http://shirakamisauto.hatenablog.com/entry/2016/09/15/182737
*/

/*:
 * @plugindesc This plugin can make HP,MP,LV invisible.
 * @author sauto
 *
 * @param isVisibleHP
 * @desc This can make HP invisible.0 is invisible.1 is visible.
 * @default 0
 * 
 * @param isVisibleMP
 * @desc This can make MP invisible.0 is invisible.1 is visible.
 * @default 0
 * 
 * @param isVisibleLV
 * @desc This can make LV and Exp invisible.0 is invisible.1 is visible.
 * @default 0
 * 
 * @help 0 is invisible.1 is visible.
 */

/*:ja
 * @plugindesc HP・MP・レベルを非表示にできます
 * @author さうと
 *
 * @param isVisibleHP
 * @desc HPを消せます。0で非表示、1で表示です。
 * @default 0
 * 
 * @param isVisibleMP
 * @desc MPを消せます。0で非表示、1で表示です。
 * @default 0
 * 
 * @param isVisibleLV
 * @desc LVと経験値表示を消せます。0で非表示、1で表示です。
 * @default 0
 * 
 * @help それぞれ値を0で非表示、1で表示です。
 */

(function () {
var parameters = PluginManager.parameters('HPMPLVInvisible');

//rpg_window.js
if(parameters['isVisibleLV']==0)
{
    Window_Base.prototype.drawActorLevel = function(actor, x, y) {};
    Window_Status.prototype.drawExpInfo = function(x, y) {};
}

if(parameters['isVisibleHP']==0)
{
    Window_Base.prototype.drawActorHp = function(actor, x, y, width) {};
}
if(parameters['isVisibleMP']==0)
{
    Window_Base.prototype.drawActorMp = function(actor, x, y, width) {};
}
})();
