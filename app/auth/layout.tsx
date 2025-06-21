const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="h-[800px] flex items-center justify-center bg-neutral-200">
            {children}
        </div>
    );
}

export default AuthLayout;