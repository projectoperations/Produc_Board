import { Card, Center, Text, UnstyledButton } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { createStyles } from '@mantine/styles';
import { ServiceType } from '../../../../types/service';
import { useCardStyles } from '../../../layout/useCardStyles';
import { useEditModeStore } from '../../Views/store';
import { BaseTileProps } from '../type';

interface ServiceTileProps extends BaseTileProps {
  service: ServiceType;
}

export const ServiceTile = ({ className, service }: ServiceTileProps) => {
  const isEditMode = useEditModeStore((x) => x.enabled);

  const { cx, classes } = useStyles();

  const {
    classes: { card: cardClass },
  } = useCardStyles();

  const inner = (
    <>
      <Text align="center" weight={500} size="md" className={classes.serviceName}>
        {service.name}
      </Text>
      <Center style={{ height: '75%', flex: 1 }}>
        <img className={classes.image} src={service.appearance.iconUrl} alt="" />
      </Center>
    </>
  );

  return (
    <Card className={cx(className, cardClass)} withBorder radius="lg" shadow="md">
      {isEditMode &&
        {
          /*<AppShelfMenu service={service} />*/
        }}{' '}
      {/* TODO: change to serviceMenu */}
      {!service.url || isEditMode ? (
        <UnstyledButton
          className={classes.button}
          style={{ pointerEvents: isEditMode ? 'none' : 'auto' }}
        >
          {inner}
        </UnstyledButton>
      ) : (
        <UnstyledButton
          style={{ pointerEvents: isEditMode ? 'none' : 'auto' }}
          component={NextLink}
          href={service.url}
          target={service.behaviour.isOpeningNewTab ? '_blank' : '_self'}
          className={cx(classes.button, classes.link)}
        >
          {inner}
        </UnstyledButton>
      )}
      {/*<ServicePing service={service} />*/}
    </Card>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    image: {
      ref: getRef('image'),
      maxHeight: '80%',
      maxWidth: '80%',
      transition: 'transform 100ms ease-in-out',
    },
    serviceName: {
      ref: getRef('serviceName'),
    },
    button: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
    },
    link: {
      [`&:hover .${getRef('image')}`]: {
        // TODO: add styles for image when hovering card
      },
      [`&:hover .${getRef('serviceName')}`]: {
        // TODO: add styles for service name when hovering card
      },
    },
  };
});