import React from 'react';

interface CaseTagProps {
  text: string;
}

const CaseTag: React.FC<CaseTagProps> = ({ text }) => <span className="case-tag">{text}</span>;

export default CaseTag;

