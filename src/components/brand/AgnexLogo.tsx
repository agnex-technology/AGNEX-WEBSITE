import React from 'react';
import { Link } from 'react-router-dom';

export interface AgnexLogoProps {
  variant?: 'light' | 'dark' | 'mark' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  alt?: string;
  asLink?: boolean;
  linkAriaLabel?: string;
}

export default function AgnexLogo({
  variant = 'light',
  size = 'lg',
  className = '',
  style = {},
  priority = false,
  alt = "AGNEX Technology — Engineering What's Next",
  asLink = false,
  linkAriaLabel = "AGNEX Technology — Home"
}: AgnexLogoProps) {
  // Determine asset source based on variant
  // 'light' and 'default' use the white-lettering + blue-arrow logo for dark surfaces (#0B0D10)
  // 'dark' uses the original dark-lettering logo for light surfaces
  // 'mark' uses the standalone X + soaring blue arrow icon
  let src = '/brand/agnex-logo-light.svg';
  let aspectRatio = 841 / 242; // ~3.475

  if (variant === 'dark') {
    src = '/brand/agnex-logo.svg';
    aspectRatio = 841 / 242;
  } else if (variant === 'mark') {
    src = '/brand/agnex-mark.svg';
    aspectRatio = 266 / 158; // mark aspect ratio
  }

  // Size mapping (responsive clamp defaults)
  let widthCss = 'clamp(150px, 12vw, 205px)';
  let intrinsicWidth = 205;

  if (typeof size === 'number') {
    widthCss = `${size}px`;
    intrinsicWidth = size;
  } else {
    switch (size) {
      case 'sm':
        widthCss = 'clamp(135px, 10vw, 155px)';
        intrinsicWidth = 150;
        break;
      case 'md':
        widthCss = 'clamp(160px, 11vw, 180px)';
        intrinsicWidth = 175;
        break;
      case 'lg':
        widthCss = 'clamp(180px, 12vw, 205px)';
        intrinsicWidth = 205;
        break;
      case 'xl':
        widthCss = 'clamp(240px, 20vw, 320px)';
        intrinsicWidth = 280;
        break;
    }
  }

  const intrinsicHeight = Math.round(intrinsicWidth / aspectRatio);

  const imgElement = (
    <img
      src={src}
      alt={alt}
      width={intrinsicWidth}
      height={intrinsicHeight}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`agnex-logo ${className}`}
      style={{
        width: widthCss,
        height: 'auto',
        aspectRatio: `${aspectRatio}`,
        display: 'block',
        objectFit: 'contain',
        ...style
      }}
    />
  );

  if (asLink) {
    return (
      <Link
        to="/"
        aria-label={linkAriaLabel}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          outlineOffset: '4px'
        }}
      >
        {imgElement}
      </Link>
    );
  }

  return imgElement;
}
