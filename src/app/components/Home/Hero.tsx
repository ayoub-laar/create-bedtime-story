"use client"

import { Button } from "@nextui-org/button"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal"
import { useDisclosure } from "@nextui-org/use-disclosure"

export default function Hero() {
  const { isOpen, onOpenChange } = useDisclosure()
  const router = useRouter()

  return (
    <div className="relative justify-center items-center">
      <section>
        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
          <motion.div
            initial={{ y: 5, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-extrabold mx-auto md:text-5xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
              Discover{" "}
              <span className="bg-gradient-to-t from-light to-foreground text-transparent bg-clip-text border-none">
                magical
              </span>{" "}
              tales
            </h1>
            <p className="max-w-2xl mx-auto text-foreground/80">
            Give your child a night full of dreams with their favorite characters
            </p>
            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button onClick={() => {router.push('/generate')}} size="lg" radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                  Get my story
                </Button>
                <Modal
                  isOpen={isOpen}
                  placement="center"
                  onOpenChange={onOpenChange}
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          Start using NextUI
                        </ModalHeader>
                        <ModalBody>
                          <p>
                            NextUI it&aposs a high customizable component
                            library to build faster, beautiful, and more
                            accessible NextJs applications.
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button
                            color="primary"
                            variant="solid"
                            onPress={onClose}
                          >
                            Action
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full h-full absolute -top-32 flex justify-end items-center -z-10"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
        </div>
      </motion.div>
    </div>
  )
}
