function Frame() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-center p-[10px] relative shrink-0 w-[114px]">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[36px] text-center text-white uppercase">10+</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-center p-[10px] relative shrink-0">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#9c9c9c] text-[18px] text-center">Custom AI Models</p>
    </div>
  );
}

function Counter() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[150px] items-center justify-center px-[62px] py-[20px] relative shrink-0 w-[306px]" data-name="Counter">
      <Frame />
      <Frame1 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-center p-[10px] relative shrink-0 w-[114px]">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[36px] text-center text-white uppercase">5+</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-center p-[10px] relative shrink-0">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#9c9c9c] text-[18px] text-center">Industries Served</p>
    </div>
  );
}

function Counter1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[150px] items-center justify-center px-[62px] py-[20px] relative shrink-0 w-[306px]" data-name="Counter">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-center p-[10px] relative shrink-0 w-[114px]">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[36px] text-center text-white uppercase">85%</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-center p-[10px] relative shrink-0">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#9c9c9c] text-[18px] text-center">ROI Increase</p>
    </div>
  );
}

function Counter2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[150px] items-center justify-center px-[62px] py-[20px] relative shrink-0 w-[306px]" data-name="Counter">
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex h-[58px] items-center justify-center p-[10px] relative shrink-0 w-[114px]">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[36px] text-center text-white uppercase">
        <span className="leading-[normal]">{`48 `}</span>
        <span className="leading-[normal] lowercase">hrs</span>
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-center p-[10px] relative shrink-0">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#9c9c9c] text-[18px] text-center">Proof of Concept</p>
    </div>
  );
}

function Counter3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[150px] items-center justify-center px-[62px] py-[20px] relative shrink-0 w-[306px]" data-name="Counter">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

export default function Counters() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center px-[72px] py-[36px] relative size-full" data-name="Counters" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 1440 222\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(-141.25 0.000005755 -0.0000035843 -141.25 1384 111)\'><stop stop-color=\'rgba(0,16,16,1)\' offset=\'0\'/><stop stop-color=\'rgba(2,28,37,1)\' offset=\'1\'/></radialGradient></defs></svg>')" }}>
      <div aria-hidden="true" className="absolute border-2 border-[#010e13] border-solid inset-[-1px] pointer-events-none" />
      <Counter />
      <div className="flex h-[75px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21.59375" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[75px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 1">
                <line id="Line 1" stroke="var(--stroke-0, white)" x2="75" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Counter1 />
      <div className="flex h-[75px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21.59375" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[75px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 1">
                <line id="Line 1" stroke="var(--stroke-0, white)" x2="75" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Counter2 />
      <div className="flex h-[75px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21.59375" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[75px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 1">
                <line id="Line 1" stroke="var(--stroke-0, white)" x2="75" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Counter3 />
    </div>
  );
}