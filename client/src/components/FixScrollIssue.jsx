import { useEffect } from "react";

const FixScrollIssue = () => {
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);  // Har page load pe top pe scroll karega
        }, 100); // Thoda delay rakho taki UI properly load ho
    }, []);

    return null;
};

export default FixScrollIssue;
