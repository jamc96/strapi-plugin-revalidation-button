import styled from 'styled-components';
import { CloudUpload } from '@strapi/icons';
import { useState } from 'react';
import { LinkButton } from '@strapi/design-system';

interface PreviewButtonStateConfig {
  url: string;
  query?: Record<string, any>;
  openTarget?: string;
  copy?: boolean;
  alwaysVisible?: boolean;
}

export interface PreviewButtonProps extends PreviewButtonStateConfig {}

const LinkButtonStyled = styled(LinkButton)`
  width: 100%;
  cursor: pointer;
  // Fix visited state color for the icon.
  &:visited {
    color: ${({ theme }) => theme.colors.primary700};
  }
`;

const PreviewButton = ({ openTarget, url }: PreviewButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!url || !openTarget) return;

    // Disable button and show loading state
    setIsLoading(true);

    try {
      // Parse openTarget to extract content type (e.g., 'about' from 'api::about.about')
      const endpoint = openTarget?.match(/^api::([^.]+)\..+$/)?.[1] || '';
      const routeQuery = `/api/${endpoint}`;
      const targetPath = `${url}?route=${encodeURIComponent(routeQuery)}`;

      // Open a new window with the constructed URL
      const newWindow = window.open(targetPath, '_blank');

      if (!newWindow) {
        throw new Error('Failed to open new window. Please check popup blockers.');
      }

      // Show success alert with the URL
      alert(`Opened revalidation page: ${targetPath}`);
    } catch (error) {
      console.error('Revalidation window open error:', error);
      alert(`Revalidation failed`);
    } finally {
      // Re-enable button and reset message
      setIsLoading(false);
    }
  };

  return (
    <LinkButtonStyled
      disabled={isLoading || !url} // Disable while loading or if URL is missing
      onClick={handleClick}
      size="S"
      startIcon={<CloudUpload />}
      variant="danger-light"
    >
      {isLoading ? 'Revalidating...' : 'Revalidate Content'}
    </LinkButtonStyled>
  );
};

export default PreviewButton;
