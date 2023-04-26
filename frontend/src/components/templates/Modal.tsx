import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from 'utils';

interface Props {
  title?: string;
  children: React.ReactNode;
  onClickClose: () => void;
  isShowClose?: boolean;
  fitContent?: boolean;
}

export default function Modal({
  title,
  children,
  onClickClose,
  isShowClose = true,
  fitContent = false,
}: Props) {
  const closeButtonRef = useRef(null);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="modal-wrapper"
        initialFocus={closeButtonRef}
        onClose={onClickClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-backdrop" onClick={onClickClose}></div>
        </Transition.Child>

        <div className="modal-panel-wrapper">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel
              className={classNames(
                `modal-panel`,
                fitContent ? 'h-fit w-fit' : 'mt-20'
              )}
            >
              <div className="flex justify-between items-center mb-4">
                {title && <h3 className="ml-1 text-sm">{title}</h3>}
                {isShowClose && (
                  <XMarkIcon
                    className="h-6 w-6 text-text-light"
                    aria-hidden="true"
                    onClick={onClickClose}
                    ref={closeButtonRef}
                  />
                )}
              </div>
              <div
                className={classNames(
                  fitContent && 'vh-center min-w-[24em] min-h-[12em]'
                )}
              >
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
