import React from 'react';
import { Button as AntdButton } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { TButtonProps } from '@/components/Button/Button.types';
import Icon, { EIconColor } from '@/components/Icon';
import Loading from '@/components/Loading';

const Button: React.FC<TButtonProps> = ({
  className,
  size,
  iconName,
  iconColor,
  type,
  htmlType,
  title,
  danger,
  reverse,
  link,
  disabled,
  loading,
  styleType,
  badge,
  badgeColor,
  badgeTextColor,
  active,
  style,
  targetLink,
  idTarget,
  onClick,
}) => {
  const router = useRouter();

  const handleClickButton = (): void => {
    if (link) {
      if (targetLink === '_blank') {
        window.open(link, targetLink);
      } else if (targetLink === '_idTarget' && idTarget) {
        const target = document.querySelector(`${idTarget}`) as any;
        if (target) {
          window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' });
        }
      } else {
        router.push(link);
      }
    } else {
      onClick?.();
    }
  };

  return (
    <div
      className={classNames('Button', className, styleType, { active, reverse, 'only-icon': !title && iconName })}
      style={style}
    >
      <AntdButton
        size={size}
        type={type}
        htmlType={htmlType}
        onClick={handleClickButton}
        danger={danger}
        disabled={disabled || loading}
      >
        <div className="Button-wrapper flex items-center justify-center">
          {loading ? (
            <Loading size={size === 'small' ? 18 : undefined} color={EIconColor.WHITE} />
          ) : (
            <>
              {iconName && (
                <div className="Button-icon">
                  <Icon name={iconName} color={iconColor} />
                </div>
              )}
              {title && <span className="Button-title">{title}</span>}
            </>
          )}

          {badge && (
            <div className="Button-badge" style={{ color: badgeTextColor, background: badgeColor }}>
              {badge}
            </div>
          )}
        </div>
      </AntdButton>
    </div>
  );
};

export default Button;
