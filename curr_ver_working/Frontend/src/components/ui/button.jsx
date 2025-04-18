export function Button({ children, onClick, variant = "default" }) {
    const styles = variant === "outline" ? "border border-gray-500" : "bg-blue-500 text-white";
    return (
      <button className={`p-2 rounded ${styles}`} onClick={onClick}>
        {children}
      </button>
    );
  }
  