import React, { useState } from 'react';

const DisabledButton = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <button type="button" disabled={disabled}>
        Save Profile
      </button>
      <button onClick={() => setDisabled(!disabled)}>
        Toggle Disabled
      </button>
    </div>
  );
};

export default DisabledButton;
