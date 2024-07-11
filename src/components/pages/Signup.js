import Illustration from '../Illustration';
import SignupForm from '../SignupForm.js';

export default function Signup() {
    return(
        <>
            <h1> Create an account</h1>
            <div className="column">
                <Illustration  />
                <SignupForm />
            </div>
        </>
    );
}