export default function Button({ children, variant = 'primary', className = '', ...props }) {
    const base = 'px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2';
    const styles = {
        primary: 'bg-primary text-white hover:bg-sky-600 dark:bg-sky-700 dark:hover:bg-sky-800 focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800',
        outline: 'border border-gray-100 hover:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
        success: 'bg-success text-white hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-800'
    };

    return (
        <button className={`${base} ${styles[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}