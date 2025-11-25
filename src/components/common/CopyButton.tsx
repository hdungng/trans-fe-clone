import { useCallback, useMemo, useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps } from '@mui/material/styles';

// project imports
import IconButton from 'components/@extended/IconButton';

// third-party
import copy from 'copy-to-clipboard';

// icons
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';

export type CopyButtonProps = {
  text?: string;
  getText?: () => string;
  html?: string;
  getHtml?: () => string;
  variant?: 'button' | 'icon';
  timeout?: number;
  onCopied?: (value: string) => void;
  sx?: SxProps;
  className?: string;
  tooltip?: string;
  tooltipCopied?: string;
  labelCopy?: string;
  labelCopied?: string;
  disabled?: boolean;
};

export default function CopyButton({
  text,
  getText,
  html,
  getHtml,
  variant = 'button',
  timeout = 1500,
  onCopied,
  sx,
  className,
  tooltip = 'Copy',
  tooltipCopied = 'Copied',
  labelCopy = 'Copy',
  labelCopied = 'Copied',
  disabled
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const value = useMemo(() => (typeof text === 'string' ? text : getText?.() ?? ''), [text, getText]);
  const htmlValue = useMemo(() => (typeof html === 'string' ? html : getHtml?.() ?? ''), [html, getHtml]);

  const handleCopy = useCallback(() => {
    if (disabled) return;
    try {
      const plain = value ?? '';

      const supportsAsyncClipboard = typeof navigator !== 'undefined' && !!navigator.clipboard && typeof (window as any).ClipboardItem !== 'undefined';
      const hv = htmlValue?.trim();
      if (supportsAsyncClipboard && hv) {
        const item = new (window as any).ClipboardItem({
          'text/html': new Blob([hv], { type: 'text/html' }),
          'text/plain': new Blob([plain], { type: 'text/plain' })
        });
        // @ts-ignore
        return navigator.clipboard.write([item]).then(() => {
          setCopied(true);
          onCopied?.(plain);
          window.setTimeout(() => setCopied(false), timeout);
        });
      }

      copy(plain);
      setCopied(true);
      onCopied?.(plain);
      window.setTimeout(() => setCopied(false), timeout);
    } catch {
      // no-op; copy-to-clipboard already handles most cases
    }
  }, [disabled, onCopied, timeout, value]);

  if (variant === 'icon') {
    return (
      <Tooltip title={copied ? tooltipCopied : tooltip}>
        <span>
          <IconButton size="large" onClick={handleCopy} disabled={disabled} className={className} sx={sx}>
            {copied ? <CheckOutlined /> : <CopyOutlined />}
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={copied ? tooltipCopied : tooltip}>
      <span>
        <Button
          variant="outlined"
          size="small"
          startIcon={copied ? <CheckOutlined /> : <CopyOutlined />}
          color={copied ? 'success' : 'inherit'}
          onClick={handleCopy}
          disabled={disabled}
          className={className}
          sx={{ textTransform: 'none', ...sx }}
        >
          {copied ? labelCopied : labelCopy}
        </Button>
      </span>
    </Tooltip>
  );
}
