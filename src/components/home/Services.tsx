import React from 'react'

type Props = {}

function Services({}: Props) {
  return (
    <section className='my-6 p-4 max-w-5xl flex flex-col gap-6 items-center justify-center mx-auto'>
        <div className="grid grid-cols-3 gap-8">
            <img src="https://unsplash.com/photos/ajDUxve6clA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8c29mdCUyMGdsYW18ZW58MHx8fHwxNzM4ODUwODczfDA&force=true&w=640" alt="" className="col-span-1 aspect-square w-full object-cover" />
            <div className="col-span-2">
                <h2 className="text-7xl mb-2 font-playfair">For Every Occasion</h2>
                <p className="text-lg w-[400px]">From soft glam to full-on diva vibes, we create customized looks for photoshoots, parties, dates, or just because! Step into your moment with confidence and flawless beauty.</p>
            </div>
        </div>
        {/* ---------------------------- */}
        <div className="grid grid-cols-3 gap-4">
            <img src="https://images.pexels.com/photos/2062542/pexels-photo-2062542.jpeg?cs=srgb&dl=pexels-bestbe-models-975242-2062542.jpg&fm=jpg&w=640&h=427" alt="" className="col-span-1 aspect-square w-full object-cover" />
            <div className="col-span-2">
                <h2 className="text-7xl mb-2 font-playfair">Bride's Special Day</h2>
                <p className="text-lg w-[400px] ">Your wedding day is all about magic—and we’ll make sure you glow in every memory. Our expert bridal makeup service is designed to complement your unique features and style, making you the center of attention, as you should be.</p>
            </div>
        </div>
        {/* ---------------------------- */}
        <div className="grid grid-cols-3 gap-4">
            <img src="https://images.pexels.com/photos/3065450/pexels-photo-3065450.jpeg" alt="" className="col-span-1 aspect-square w-full object-cover" />
            <div className="col-span-2">
                <h2 className="text-7xl mb-2 font-playfair">Complements</h2>
                <p className="text-lg w-[400px]">Want luscious locks or dreamy lashes? We’ve got just the right touch! Whether it’s sleek styling, elegant updos, or fluttery lash installs, we’ll make sure your look stays on point.</p>
            </div>
        </div>
    </section>
  )
}

export default Services