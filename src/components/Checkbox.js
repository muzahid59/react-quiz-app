
export default function Checkbox({children}) {
    return (
        <label>
            <input type="checkbox" />
            <span>{children}</span>
        </label>
    );
}