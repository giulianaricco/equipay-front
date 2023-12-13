import toastr from "toastr";
import "toastr/build/toastr.min.css";

toastr.options = {
  positionClass: "toast-top-right",
  hideEasing: "linear",
  showEasing: "swing",
  closeButton: true,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  showDuration: 1000,
  hideDuration: 1000,
};

export default toastr;