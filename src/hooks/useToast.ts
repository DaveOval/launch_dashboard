import { useCallback } from "react"
import { toast } from 'sonner';

//Component to render a notification
export const useToast = () => {
    const makeAToast = useCallback(( message : string, type = "success") => {
        switch (type) {
            case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'warning':
            toast.warning(message);
            break;
        default:
            toast(message);
        }
    }, [])

    return makeAToast;
}