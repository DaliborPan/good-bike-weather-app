import { FC, Fragment, ReactNode, Children, cloneElement } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';

const OVERLAY_TRANSITION_PROPS = {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0'
};

const DIALOG_TRANSITION_PROPS = {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95'
};

interface IProps {
    open: boolean;
    onClose: () => void;
    className?: string;
    children: ReactNode | ReactNode[];
}

export const Dialog: FC<IProps> = ({ open, onClose, className, children }) => {

    const ac = Children.toArray(children) as JSX.Element[];
    return (
        <Transition appear show={open} as={Fragment}>
            <HeadlessDialog as="div" className="fixed inset-0 z-20 overflow-y-auto" onClose={onClose}>
                <div className="h-screen flex justify-center items-center">
                    <Transition.Child {...OVERLAY_TRANSITION_PROPS}>
                        <HeadlessDialog.Overlay className="fixed inset-0 bg-black opacity-40" />
                    </Transition.Child>
                    <Transition.Child
                        {...DIALOG_TRANSITION_PROPS}
                        className={`relative bg-white rounded-xl overflow-hidden flex flex-col ${className ? className : ''}`}
                    >
                        {ac[0] && ac[0].type?.name === 'Header' ? cloneElement(ac[0], { onClose: onClose }) : ac[0]}
                        {Children.map(
                            ac.filter((_, index) => index > 0),
                            (child) => child
                        )}
                    </Transition.Child>
                </div>
            </HeadlessDialog>
        </Transition>
    );
};