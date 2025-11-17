import { cva } from 'class-variance-authority';

const avatarStackVariants = cva('flex -space-x-4 -space-y-4', {
	variants: {
		orientation: {
			vertical: 'flex-row',
			horizontal: 'flex-col',
		},
	},
	defaultVariants: {
		orientation: 'vertical',
	},
});

export default avatarStackVariants;
