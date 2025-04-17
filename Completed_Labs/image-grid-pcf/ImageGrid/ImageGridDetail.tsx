/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { FiMaximize2 } from 'react-icons/fi'; // Import the fullscreen icon
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';

export interface ISliderPhoto {
    src: string;
    title: string;
}

export interface ImageSliderProps {
    images: ISliderPhoto[];
    width: number;
    height: number;
}

export const ImageGridDetail = ({ width, height, images }: ImageSliderProps) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass>();

    const swiperRef = React.useRef<HTMLDivElement>(null);

    const goFullScreen = () => {
        const swiperNode = swiperRef.current;

        if (swiperNode) {
            if (document.fullscreenElement) {
                void document.exitFullscreen();
            } else {
                void swiperNode.requestFullscreen();
            }
        }
    };

    // Helper function to determine dimension
    const getDimension = (value: number): string => {
        return value !== undefined && !isNaN(value) && value !== -1 ? `${value}px` : '100vh';
    };

    // Create image slides once to reuse in both swipers
    const isValidImageUrl = (url: string): boolean => {
        const pattern = /^(https?:\/\/|data:image\/)/;
        return pattern.test(url);
    };

    const renderSlides = () => 
        images
            ?.filter(image => isValidImageUrl(image.src))
            ?.map((image, index) => (
                <SwiperSlide key={index}>
                    <img src={image.src} alt={image.title} />
                </SwiperSlide>
            ));

    return (
        <div
            ref={swiperRef}
            style={{
                margin: '0 auto',
                position: 'relative',
                width: getDimension(width),
                height: getDimension(height),
            }}
        >
            <button
                type="button"
                onClick={goFullScreen}
                className="swiper-button-fullscreen"
            >
                <FiMaximize2 size={32}/>
            </button>
            <Swiper
                loop={true}
                spaceBetween={11}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Zoom, FreeMode, Navigation, Thumbs]}
                className="image-grid"
                zoom={true}
            >
                {renderSlides()}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="image-grid-thumbs"
            >
                {renderSlides()}
            </Swiper>
        </div>
    );
};
