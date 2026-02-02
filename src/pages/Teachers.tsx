import { useEffect, useState } from "react";
import getTeachers from "../services/teachersService"
import type { Teacher } from "../types/teachers";



function Teachers() {
    const [teachers, setTeachers] = useState<Teacher[]>();

    useEffect(() => {
        const data = async () => {
            const data = await getTeachers();
            if (data) {
                setTeachers(data);
            }
        }
        data();

    }, [])

    console.log('data', teachers);

    return (
        <>

            <h1>TEACHERS</h1>
            <h1>WQhzdFtLtawRf0CA2DxblzegS46eyUDGobgKUykn</h1>
            {teachers?.map((item, index) => (<p style={{ marginBottom: "20px" }} key={index}>{JSON.stringify(item)}</p>))}
        </>
    )
}

export default Teachers