// const TiltCard = () => {
//   const ref = useRef<HTMLDivElement | null>(null);

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const xSpring = useSpring(x);
//   const ySpring = useSpring(y);

//   const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!ref.current) return;

//     const rect = ref.current.getBoundingClientRect();

//     const width = rect.width;
//     const height = rect.height;

//     const mouseX = (e.clientX - rect.left) / width;
//     const mouseY = (e.clientY - rect.top) / height;

//     const rX = (mouseY - 0.5) * ROTATION_RANGE;
//     const rY = (mouseX - 0.5) * ROTATION_RANGE;

//     x.set(rX);
//     y.set(rY);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         transformStyle: "preserve-3d",
//         transform,
//       }}
//       className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
//     >
//       <div
//         style={{
//           transform: "translateZ(75px)",
//           transformStyle: "preserve-3d",
//         }}
//         className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
//       >
//         <FiMousePointer
//           style={{
//             transform: "translateZ(75px)",
//           }}
//           className="mx-auto text-4xl"
//         />
//         <p
//           style={{
//             transform: "translateZ(50px)",
//           }}
//           className="text-center text-2xl font-bold"
//         >
//           HOVER ME
//         </p>
//       </div>
//     </motion.div>
//   );
// };
