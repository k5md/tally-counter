import { shape, number, string, objectOf, oneOfType, arrayOf, func } from 'prop-types';

export const SortableGridPropTypes = shape({
  blockTransitionDuration: number,
  activeBlockCenteringDuration: number,
  itemsPerRow: number,
  dragActivationTreshold: number,
  itemOrder: objectOf(
    shape({
      key: oneOfType([number, string]),
      order: number,
    }),
  ),
  children: arrayOf(
    shape({
      key: string,
    }),
  ),
  onDragRelease: func,
  blockHeight: number,
});

export const SortableGridDefaultProps = {
  blockTransitionDuration: 300,
  activeBlockCenteringDuration: 200,
  itemsPerRow: 4,
  dragActivationTreshold: 200,
  onDragRelease: () => {},
};
