import Swal from 'sweetalert2';

type TProps = {
    title: string;
    message: string;
    icon: 'success' | 'error';
};

export const Toast = ({ message, title, icon }: TProps) => {
    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });
};
