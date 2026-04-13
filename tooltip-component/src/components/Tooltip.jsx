import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.css";

const Tooltip = ({ text, position = "top", children }) => {
  const [visible, setVisible] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState(position);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  useEffect(() => {
    if (!visible) return;

    const tooltip = tooltipRef.current;
    const trigger = triggerRef.current;

    if (!tooltip || !trigger) return;

    const rect = tooltip.getBoundingClientRect();

    let newPosition = position;

    if (rect.top < 0) newPosition = "bottom";
    if (rect.bottom > window.innerHeight) newPosition = "top";
    if (rect.left < 0) newPosition = "right";
    if (rect.right > window.innerWidth) newPosition = "left";

    setAdjustedPosition(newPosition);
  }, [visible, position]);

  return (
    <div
      className="tooltip-container"
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      <div
        ref={tooltipRef}
        role="tooltip"
        className={`tooltip-box ${visible ? "show" : ""} ${adjustedPosition}`}
        aria-hidden={!visible}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;