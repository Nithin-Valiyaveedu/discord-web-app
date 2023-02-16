import Swal from "sweetalert2";

export const popup = (title, description, type) => {
    return Swal.fire(
        title,
        description,
        type
    )
};