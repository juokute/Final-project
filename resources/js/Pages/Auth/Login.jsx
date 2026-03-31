import { useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#f4f6f9",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
        }}>
            <Head title="Log in" />

            {/* Logo */}
            <div
                onClick={() => router.visit(route("welcome"))}
                style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "32px", cursor: "pointer" }}
            >
                <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    background: "#393b83", display: "flex", alignItems: "center",
                    justifyContent: "center", color: "white", fontSize: "20px", fontWeight: "900",
                }}>♥</div>
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#393b83" }}>FundHeart</span>
            </div>

            {/* Card */}
            <div style={{
                background: "white",
                borderRadius: "16px",
                padding: "40px",
                width: "100%",
                maxWidth: "420px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}>
                <h2 style={{ fontSize: "26px", fontWeight: "900", color: "#393b83", marginBottom: "8px", textAlign: "center" }}>
                    Welcome back
                </h2>
                <p style={{ textAlign: "center", color: "#888", marginBottom: "28px", fontSize: "15px" }}>
                    Log in to your FundHeart account
                </p>

                {status && (
                    <div style={{ background: "#d1fae5", color: "#065f46", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    {/* Email */}
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            autoComplete="username"
                            autoFocus
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: errors.email ? "1px solid crimson" : "1px solid #dcdfe6",
                                fontSize: "15px",
                                background: "#fafafa",
                                color: "#333",
                                outline: "none",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#393b83"}
                            onBlur={(e) => e.target.style.borderColor = errors.email ? "crimson" : "#dcdfe6"}
                        />
                        {errors.email && <div style={{ color: "crimson", fontSize: "13px", marginTop: "4px" }}>{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            autoComplete="current-password"
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: errors.password ? "1px solid crimson" : "1px solid #dcdfe6",
                                fontSize: "15px",
                                background: "#fafafa",
                                color: "#333",
                                outline: "none",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#393b83"}
                            onBlur={(e) => e.target.style.borderColor = errors.password ? "crimson" : "#dcdfe6"}
                        />
                        {errors.password && <div style={{ color: "crimson", fontSize: "13px", marginTop: "4px" }}>{errors.password}</div>}
                    </div>

                    {/* Remember me + Forgot password */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "8px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#555" }}>
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData("remember", e.target.checked)}
                                style={{ accentColor: "#393b83", width: "16px", height: "16px" }}
                            />
                            Remember me
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                style={{ fontSize: "14px", color: "#393b83", textDecoration: "none", fontWeight: "600" }}
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "10px",
                            background: processing ? "#6c6fa8" : "#393b83",
                            color: "white",
                            border: "none",
                            fontSize: "16px",
                            fontWeight: "700",
                            cursor: processing ? "not-allowed" : "pointer",
                            transition: "background 0.2s",
                        }}
                    >
                        {processing ? "Logging in..." : "Log in"}
                    </button>
                </form>

                {/* Register link */}
                <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#888" }}>
                    Don't have an account?{" "}
                    <Link
                        href={route("register")}
                        style={{ color: "#393b83", fontWeight: "700", textDecoration: "none" }}
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
