import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";

const About = () => {
	return (
		<section className="mt-16 flex flex-col gap-16  animate-appear max-w-[1280px] min-h-[100rem] mb-24 ">
			<Head>
				<title>About</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="text-transparent font-[500] text-center text-2xl bg-clip-text bg-gradient-to-r from-white via-FA-Primary-purple-050 to-FA-Primary-yellow-vivid-300">
				About the Creator
			</h1>
			<article className="flex min-h-[100%] justify-center items-center mobile:flex-col ">
				<div className="flex justify-center items-center w-[100%] ">
					<Image className="rounded-lg    " src={"/Assets/profileImage.jpg"} width={300} height={320} layout="fixed" />
				</div>
				<p className="text-white text-base p-4 text-justify">
					👋Hello👋! I am <span className="font-[700]">Fanourios Chatziathaanasiou</span>, a motivated enrolled graduate in
					Informatics from the University of Piraeus with high interest in the process of creating, maintaining font-end and
					full-stack applications, pursuing a career in Software Engineering.
					<br /> <br />
					<span className="font-[700]">Financial Assets Analyst</span> is my University of Piraeus Dissertation project, A
					full-stack application giving the ability to perform basic technical analysis on US stock charts, Download datasets
					and provide insights through a basic trading System, giving the user the abillity to decide wether there's an
					opportunity to buy-sell financial data.
				</p>
			</article>

			<article>
				<h2 className="text-transparent font-[500] text-center text-2xl bg-clip-text bg-gradient-to-r from-white via-FA-Primary-purple-050 to-FA-Primary-yellow-vivid-300">
					Project's Tech stack
				</h2>
				<div className="p-4 bg-FA-Primary-purple-050 rounded-lg w-[100%] flex justify-center items-center flex-wrap gap-12">
					<Image className="rounded-lg   " src={"/Assets/Logos/MongoDB.svg"} width={300} height={110} layout="fixed" />
					<Image className="rounded-lg   " src={"/Assets/Logos/NextJS.svg"} width={300} height={110} layout="fixed" />
					<Image
						className="rounded-lg   "
						src={"/Assets/Logos/SpringFramework.svg"}
						width={300}
						height={110}
						layout="fixed"
					/>

					<Image className="rounded-lg  " src={"/Assets/Logos/Typescript.svg"} width={300} height={110} layout="fixed" />
					<Image className="rounded-lg  " src={"/Assets/Logos/TailwindCSS.svg"} width={300} height={40} layout="fixed" />
				</div>
			</article>
			<article>
				<h2 className="text-transparent font-[500] text-center text-2xl bg-clip-text bg-gradient-to-r from-white via-FA-Primary-purple-050 to-FA-Primary-yellow-vivid-300">
					Contact me
				</h2>
				<p className="text-white text-base p-4  text-center">
					You can contact me or find more information in the links below.
				</p>
				<div className="flex justify-center items-center gap-40 flex-wrap mt-10">
					<Link href="https://www.linkedin.com/in/fanourios-chatziathanasiou/">
						<a target={"_blank"}>
							<Image className="rounded-lg" src={"/Assets/Logos/LinkedIn.svg"} width={200} height={110} layout="fixed" />
						</a>
					</Link>
					<Link href="https://github.com/Fanourios-Chatziathanasiou">
						<a target={"_blank"}>
							<Image className="rounded-lg  " src={"/Assets/Logos/GitHub.png"} width={110} height={110} layout="fixed" />
						</a>
					</Link>
				</div>
			</article>
			<article>
				<h2 className="text-transparent font-[500] text-center text-xl bg-clip-text bg-gradient-to-r from-white via-FA-Primary-purple-050 to-FA-Primary-yellow-vivid-300">
					Special Thanks to&nbsp;
					<Link className="hover:text-white" href="https://github.com/react-financial/react-financial-charts">
						<a className="underline decoration-white" target={"_blank"}>
							React Financial Charts.
						</a>
					</Link>
				</h2>
				<p className="text-white text-base p-4 text-justify  ">
					A big part of my frontend dissertation was based on React Financial Charts ( React Stockcharts' successor ). If
					you're considering using financial Charts for your project, then i would highly recommend this library. It comes
					with many examples and ready to use components, to build and scale on.
				</p>
				<div className="flex justify-center items-center gap-40 flex-wrap mt-10"></div>
			</article>
		</section>
	);
};

export default About;
