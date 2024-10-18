import React from 'react';

interface OverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export function Overlay({ isVisible, onClose }: OverlayProps) {
  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    />
  );
}
