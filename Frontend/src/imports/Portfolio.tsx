import imgUntitledDesign51 from "figma:asset/a27404bf1a3aa3a31ff2647c53bfe3dea010819f.png";

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#9c9c9c] text-[18px] text-center">Portfolio</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="font-['Adobe_Blank:Regular',sans-serif] leading-[44px] not-italic relative shrink-0 text-[28px] text-center text-white w-[737px] whitespace-pre-wrap">From Challenge to Victory: Exploring Case Studies of Innovation and Excellence</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-[1296px]">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#9c9c9c] text-[14px] tracking-[0.56px]">Category</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[44px] relative shrink-0 text-[24px] text-white tracking-[0.96px]">{`                                  Dave Financial CRM`}</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Frame4 />
      <Frame3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[410px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Manrope:Regular',sans-serif] font-normal leading-[28px] min-h-px min-w-px relative self-stretch text-[16px] text-white tracking-[0.32px] whitespace-pre-wrap">Lorem ipsum dolor sit amet consectetur. Eu lobortis aliquet nec dui blandit faucibus proin vitae adipiscing.</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0">
      <Frame5 />
      <Paragraph />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[48px] items-start relative shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-start pl-[36px] relative shrink-0 w-[636px]">
      <Frame7 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0">
      <Frame8 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] h-[154px] items-center relative shrink-0 w-[1266px]">
      <Frame9 />
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start px-[72px] py-[120px] relative size-full" data-name="Portfolio" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\'0 0 1440 1336\' xmlns=\'http://www.w3.org/2000/svg\' preserveAspectRatio=\'none\'><rect x=\'0\' y=\'0\' height=\'100%\' width=\'100%\' fill=\'url(%23grad)\' opacity=\'1\'/><defs><radialGradient id=\'grad\' gradientUnits=\'userSpaceOnUse\' cx=\'0\' cy=\'0\' r=\'10\' gradientTransform=\'matrix(-99.55 88.709 -54.584 -165.37 1284 46.231)\'><stop stop-color=\'rgba(1,16,17,1)\' offset=\'0\'/><stop stop-color=\'rgba(2,23,29,1)\' offset=\'1\'/></radialGradient></defs></svg>')" }}>
      <Frame />
      <Frame10 />
      <div className="aspect-[1366/768] relative shrink-0 w-full" data-name="Untitled design (5) 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgUntitledDesign51} />
      </div>
    </div>
  );
}