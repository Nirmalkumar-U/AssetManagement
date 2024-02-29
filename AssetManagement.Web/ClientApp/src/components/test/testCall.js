import { Testorm } from "./testform";
import { Link, useParams } from 'react-router-dom';

const TestCall = () => {
    let { employeeId } = useParams();
    return (
        <Testorm
            data={useParams()}
        />
    );
}

export default TestCall;