import svgPaths from "./svg-oka7l873qm";
import imgBrookeCagleG1Kr4OzfoacUnsplash1 from "figma:asset/f687ccdf2e16530c580690b03b0e58b4012ea25f.png";

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['Inter_Tight:SemiBold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#9c9c9c] text-[20px] text-center">Who We Are</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['Inter_Tight:Regular',sans-serif] leading-[44px] not-italic relative shrink-0 text-[28px] text-center text-white w-[737px] whitespace-pre-wrap">We are “AI Architects”</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[1296px]">
      <Frame9 />
      <Frame8 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[526px]">
      <p className="flex-[1_0_0] font-['Inter_Tight:SemiBold_Italic',sans-serif] leading-[48px] min-h-px min-w-px not-italic relative text-[28px] text-white tracking-[0.56px] whitespace-pre-wrap">{`We build what others can't.`}</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[20px] text-white w-[526px] whitespace-pre-wrap">Our team of machine learning experts, data scientists, and industry specialists creates custom AI models that solve real business problems—not generic ones.</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[20px] text-white w-[526px] whitespace-pre-wrap">From computer vision and natural language processing to predictive analytics and process automation, we engineer AI solutions that integrate perfectly with your existing systems and deliver measurable impact</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[526px]">
      <Frame1 />
      <Frame2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0 w-full">
      <Frame />
      <Frame3 />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Arrow - Right 3">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Arrow - Right 3">
          <path d="M20.2497 12H4.24993" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
          <path d={svgPaths.p1a4a26c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
          <path d={svgPaths.p1ba71300} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="square" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center px-[36px] py-[16px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[8px]" />
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[16px] text-white tracking-[0.32px]">Know more</p>
      <ArrowRight />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start pl-[24px] relative shrink-0 w-[636px]">
      <Frame4 />
      <Button />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
      <div className="h-[470px] relative shrink-0 w-[636px]" data-name="brooke-cagle-g1Kr4Ozfoac-unsplash 1">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgBrookeCagleG1Kr4OzfoacUnsplash1} />
          <div className="absolute inset-0" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 636 470\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(65.504 -40.266 124.1 247.9 -19.04 402.66)\'><stop stop-color=\'rgba(0,0,0,1)\' offset=\'0\'/><stop stop-color=\'rgba(0,0,0,0)\' offset=\'1\'/></radialGradient></defs></svg>')" }} />
        </div>
      </div>
      <Frame5 />
    </div>
  );
}

export default function AboutUs() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start px-[72px] py-[120px] relative size-full" data-name="About Us" style={{ backgroundImage: "linear-gradient(23.0266deg, rgb(3, 33, 45) 13.642%, rgb(1, 16, 17) 62.053%)" }}>
      <Frame7 />
      <Frame6 />
    </div>
  );
}