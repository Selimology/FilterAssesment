
export const Button = ({text, onClick}: {
    text: string,
    onClick: () => void
}) => {
    return <button className="p-2 bg-gray-900 text-white w-full rounded" onClick={() => onClick()}>{text}</button>;
}