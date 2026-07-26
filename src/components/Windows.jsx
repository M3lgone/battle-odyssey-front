export default function Window({
    title,
    children,
    className = "",
}) {
    return (
        <section
            className={`
                relative
                w-full
                rounded-md
                border-4
                border-white
                bg-gradient-to-b
                from-blue-800
                to-blue-950
                p-6
                shadow-[0_0_0_6px_#64748b]
                ${className}
            `}
        >
            {title && (
                <h2 className="mb-6 text-center text-3xl font-bold text-white">
                    {title}
                </h2>
            )}

            {children}
        </section>
    );
}