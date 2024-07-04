
export default function Checkbox({ className, children}) {
    return (
        <label className= {className}>
            <input type="checkbox" />
            <span>{children}</span>
        </label>
    );
}