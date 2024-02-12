import React, { useState } from "react";
import Select from "@/components/elements/Select";

const NORMALIZE_TYPE = [
  {
    name: "Auto",
    _id: "auto",
  },
  {
    name: "Manual",
    _id: "manual",
  },
];

const Normalize: React.FC<{ onNormalize: (props: any) => void }> = ({
  onNormalize,
}) => {
  const [normalizeType, setNormalizeType] = useState<"auto" | "manual">();
  return (
    <div>
      <p className="color-main medium-20">
        TMK TMK Inc, as your service provider, is not responsible for any
        financial or legal repercussions resulting from facilitating your
        request. It is the sole responsibility of the user to maintain legal
        compliance while using TMK.
      </p>
      <div
        style={{
          margin: "1rem",
        }}
      >
        <Select
          data={NORMALIZE_TYPE}
          valueProp={"_id"}
          labelProp={"name"}
          label={"Type"}
          setValue={setNormalizeType}
          value={normalizeType}
          placeholder="Normalize type"
        />
      </div>
    </div>
  );
};

export default Normalize;
