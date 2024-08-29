import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setisLoading(true);

            try {
                const response = await fn;

                setdata(response);
            } catch (error) {
                Alert.alert("Error", error.message);
            } finally {
                setisLoading(false);
            }
        }

        fetchData();
    }, []);

    const refetch = () => fetchData();

    return {data, isLoading, refetch}
}
export default useAppwrite