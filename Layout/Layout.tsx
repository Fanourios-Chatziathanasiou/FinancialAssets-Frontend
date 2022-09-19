import HeaderNav from "../src/components/navbar/HeaderNav";

export default function Layout({ children }: any) {
	return (
		<div className="lg:px-[2rem] max-w-[1440px] m-auto bg-blue-50 min-h-[100rem]  ">
			<HeaderNav />
			<main className="w-[100%] flex flex-col items-center justify-center mobile:px-6  ">{children}</main>
		</div>
	);
}
//
