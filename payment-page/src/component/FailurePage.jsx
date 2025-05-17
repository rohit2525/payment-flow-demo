import "../css/FailurePage.css"

function FailurePage({reason, onRetryCard, onRetryOtp, canRetryOtp}) {
    return (
        <div className="failure-container">
            <h2><span role="img" aria-label="fail">❌</span> Payment Failed</h2>
            <p>Unfortunately, your payment could not be processed.</p>
            {reason && <p className="failure-reason"><strong>Reason:</strong> {reason}</p>}

            {canRetryOtp && (
                <button onClick={onRetryOtp}>Back to OTP</button>
            )}
            <button onClick={onRetryCard}>Retry Card</button>
        </div>
    );
}

export default FailurePage;