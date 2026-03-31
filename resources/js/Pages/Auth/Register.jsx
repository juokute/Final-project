import { useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
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
            <Head title="Register" />

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
                    Create account
                </h2>
                <p style={{ textAlign: "center", color: "#888", marginBottom: "28px", fontSize: "15px" }}>
                    Join FundHeart and start making a difference
                </p>

                <form onSubmit={submit}>
                    {/* Name */}
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            autoComplete="name"
                            autoFocus
                            required
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: errors.name ? "1px solid crimson" : "1px solid #dcdfe6",
                                fontSize: "15px",
                                background: "#fafafa",
                                color: "#333",
                                outline: "none",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#393b83"}
                            onBlur={(e) => e.target.style.borderColor = errors.name ? "crimson" : "#dcdfe6"}
                        />
                        {errors.name && <div style={{ color: "crimson", fontSize: "13px", marginTop: "4px" }}>{errors.name}</div>}
                    </div>

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
                            required
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
                            autoComplete="new-password"
                            required
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

                    {/* Confirm Password */}
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#555", display: "block", marginBottom: "6px" }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            autoComplete="new-password"
                            required
                            style={{
                                width: "100%",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: errors.password_confirmation ? "1px solid crimson" : "1px solid #dcdfe6",
                                fontSize: "15px",
                                background: "#fafafa",
                                color: "#333",
                                outline: "none",
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#393b83"}
                            onBlur={(e) => e.target.style.borderColor = errors.password_confirmation ? "crimson" : "#dcdfe6"}
                        />
                        {errors.password_confirmation && <div style={{ color: "crimson", fontSize: "13px", marginTop: "4px" }}>{errors.password_confirmation}</div>}
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
                        {processing ? "Creating account..." : "Create account"}
                    </button>
                </form>

                {/* Login link */}
                <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#888" }}>
                    Already have an account?{" "}
                    <Link
                        href={route("login")}
                        style={{ color: "#393b83", fontWeight: "700", textDecoration: "none" }}
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
