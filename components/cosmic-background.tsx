"use client";

import { particles as Particles } from "@appletosolutions/reactbits";
import { useAppSelector } from "@/store/hooks";

function CosmicBackground() {
  const variant = useAppSelector((state) => state.variant.variant);

  if (variant !== 1) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(123,211,255,0.16),transparent_32%),radial-gradient(circle_at_20%_20%,rgba(120,119,255,0.18),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(93,224,230,0.12),transparent_28%),linear-gradient(180deg,#02030a_0%,#07111f_42%,#020611_100%)]" />
      <div className="absolute inset-0 opacity-85">
        <Particles
          className="h-full w-full"
          particleCount={260}
          particleSpread={14}
          speed={0.06}
          particleBaseSize={90}
          sizeRandomness={1.1}
          cameraDistance={18}
          alphaParticles
          moveParticlesOnHover
          particleHoverFactor={0.8}
          particleColors={["#ffffff", "#9bdcff", "#78a8ff", "#d6efff"]}
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(2,6,17,0.08)_45%,rgba(2,6,17,0.72)_100%)]" />
    </div>
  );
}

export { CosmicBackground };
