/**
 * Created by hasee on 2018/4/25.
 */
import $ from "jquery";
import Config from '@/config/config.js'

-function () {
  let path=Config.path
  /*第三方类库样式（开始）*/
  $("head").append($(' <script src="'+path+'/assets/global/import_other_css.js"></script>'))
  $("head").append($("<script>importOtherCss.init('"+path+"');</script>"))
  $("head").append($('<script src="'+path+'/assets/global/plugins/respond.min.js"></script>'))
  $("head").append($('<script src="'+path+'/assets/global/plugins/excanvas.min.js"></script>'))
  $("head").append($('<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=dd7211aa724c28f11134b1ef85d3a3fd"></script>'))
  $("head").append($('<script src="'+path+'/assets/global/plugins/jquery.min.js" type="text/javascript"></script>'))
  $("head").append($('<script type="text/javascript" src="'+path+'/assets/global/scripts/datatable.js"></script>'))
  $("head").append($('<script src="'+path+'/assets/global/import_other_js.js"></script>'))
  $("head").append($("<script>importOtherJS.init('"+path+"');</script>"))
  $("head").append($('<script src="'+path+'/assets/global/scripts/linechart-plugin.js" type="text/javascript"></script>'))
  $("head").append($('<script src="'+path+'/assets/pages/scripts/dxcr/bootstrap-datetimepicker.js"></script>'))
  $("head").append($('<script src="'+path+'/assets/pages/scripts/dxcr/bootstrap-datetimepicker.zh-CN.js"></script>'))
  $("head").append($('<link rel="stylesheet" href="'+path+'/assets/layouts/layout/css/themes/light-blue.css">'))


}()


