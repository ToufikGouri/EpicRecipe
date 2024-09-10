import LoadingGif from "./assets/Loading.gif"
import SweetAlert from "sweetalert2"

export const toast = SweetAlert.mixin({
    toast: true,
    position: "top",
    timer: 2000,
    showConfirmButton: false,
})

export const modal = (msg, confText = "Ok", canText = "Cancel", confBtnColor = "#3085d6") => {
    return SweetAlert.fire({
        title: `${msg}`,
        showCancelButton: true,
        confirmButtonText: `${confText}`,
        confirmButtonColor: `${confBtnColor}`,
        cancelButtonText: `${canText}`,
    })
}

export const Loading = (msg = "Loading") => {
    return toast.fire({
        html: `<div style='display: flex; align-items: center; font-weight: bold'><h1>${msg}</h1><img src="${LoadingGif}" alt="..." style='height: 50px; margin: 0 10px;' /></div>`,
        position: "center",
        width: 'auto',
        timer: 8000,
    })
}