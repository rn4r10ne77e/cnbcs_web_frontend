import { useEffect } from "react";

// CSS keyframes를 한 번만 추가
const addDotLoaderStyles = () => {
    const styleId = 'css-dotloader-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
      @keyframes dotPulse {
        0%, 80%, 100% {
          transform: scale(1);
          opacity: 0.4;
        }
        40% {
          transform: scale(1.5);
          opacity: 1;
        }
      }
    `;
        document.head.appendChild(style);
    }
};

export const DotLoader = ({
                              size = 16,
                              color = '#066c21',
                              speed = 400,
                              dotCount = 4,
                              centered = true
                          }) => {
    useEffect(() => {
        addDotLoaderStyles();
    }, []);

    const totalDuration = (speed * dotCount) / 1000;  // 전체 주기
    const delayBetweenDots = speed / 1000;            // 각 점 사이 딜레이

    const containerStyle = centered ? {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    } : {
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
    };

    return (
        // 오버레이 div (새로 추가)
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* 기존 점들 컨테이너 */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {Array.from({ length: dotCount }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            backgroundColor: color,
                            borderRadius: '50%',
                            animation: `dotPulse ${totalDuration}s ease-in-out ${i * delayBetweenDots}s infinite`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};