import classes from '../../styles/Signup.module.css';
import Button from '../Button.js';
import Checkbox from '../Checkbox.js';
import Form from '../Form.js';
import Illustration from '../Illustration';
import TextInput from '../TextInput.js';

export default function Signup() {
    return(
        <>
            <h1> Create an account</h1>
            <div className="column">
                <Illustration  />
                <Form className={`${classes.signup}`}>
                    <TextInput type="text" placeholder="Enter name" icon="person" />
                    <TextInput type="text" placeholder="Enter email" icon="alternate_email" />
                    <TextInput type="password" placeholder="Enter password" icon="lock" />
                    <TextInput type="password" placeholder="Confirm password" icon="lock_clock" />
                    <Checkbox> I agree to the Terms & Conditions </Checkbox>
                    <Button> <span>Submit now</span> </Button>
                    <div className="info">
                        Already have an account? <a href="login.html">Login</a> instead.
                    </div>
                </Form>
            </div>
        </>
    );
}