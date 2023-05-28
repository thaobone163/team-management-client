import { contactAndFeedback } from '@/util/mics';
import { useFormik } from 'formik';
import Head from 'next/head'
export default function Test() {
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      subject: '',
      content: ''
    },
    onSubmit: feedback
  })

  async function feedback(values) {
    await contactAndFeedback(values.fullname, values.email, values.subject, values.content).then((data) => {
      alert(data.message)
      formik.setValues({
        fullname: '',
        email: '',
        subject: '',
        content: ''
      })
    })
  }

  return (
    <>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-[85rem] px-4 dark:bg-gray-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white sm:text-4xl">Feedback</h1>
          </div>

          <div className="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold dark:text-white md:text-3xl">Team. Contacts</h2>

              <div className="flex gap-x-7 py-6">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Contact us by</h3>
                  <p className="mt-1 text-sm text-gray-500">If you wish to contact us instead please use</p>
                  <p className="flex mt-2 items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Email: teams@site.com</p>
                  <p className="flex mt-2 items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Phone: 0123456789</p>
                  <p className="flex mt-2 items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Address: 144 Xuan Thuy, Hanoi</p>
                </div>
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" height="300" width="300">
                <defs></defs>
                <path d="M163.868,22.443c-26.033.41-133.291.633-160.119.292C2.156,22.715,2.035,20,3.684,20c27.655.034,123.256-.493,160.132.3C165.591,20.336,165.109,22.423,163.868,22.443Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M131.923,100.415a18.385,18.385,0,0,1-5.653,1.433,37.345,37.345,0,0,1-.074,6.878.534.534,0,0,1-1.052-.038c-.187-1.563.25-3.256-.065-6.763-2.339.063-3.435-.662-5.49-.941a37.558,37.558,0,0,1-14.429-5.12.627.627,0,0,1-.121-.873A58.719,58.719,0,0,0,115.3,76.4c.267-.765,1.152-1.793,1.156-.476.011,3.376-.383,6.75-.383,10.131,0,6.136.163,12.7,6.141,14.242,3.666.943,7.078-.253,9.347-.859C132.1,99.289,132.5,100.136,131.923,100.415Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M123.269,87.286c-.524,1.015,1.262.895,2.333.946a.574.574,0,0,1,.095,1.128,5.617,5.617,0,0,1-2.121-.12c-1.238-.257-2.183-.713-1.509-2.1a24.313,24.313,0,0,1,1.482-2.717.517.517,0,0,1,.928.436A17.885,17.885,0,0,1,123.269,87.286Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M130.054,83.377c.012.642.06,1.615-.886,1.64-.762.021-.976-.653-.972-1.554C128.2,81.84,130.015,81.388,130.054,83.377Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M121.133,83.336c-.016.614-.277,1.193-.986,1.164-.592-.024-.805-.824-.788-1.351.025-.778.27-1.175.762-1.283C120.876,81.7,121.154,82.566,121.133,83.336Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M120.448,78.756a2.141,2.141,0,0,0-2.042.962c-.548.81-1.134.145-.926-.335a3,3,0,0,1,3.12-1.726A.555.555,0,0,1,120.448,78.756Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M128.594,78.618a.526.526,0,0,1-.16-1.026,3.233,3.233,0,0,1,3.716,2.056c.165.573-.6,1.043-.89.4A2.522,2.522,0,0,0,128.594,78.618Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M123.83,92.665a4.425,4.425,0,0,0,5.218,2.471,4.371,4.371,0,0,0,2.9-5.212c-.122-.5-.57-.674-1.108-.25-2.251,1.774-3.917,2.051-6.577,2.095C123.831,91.776,123.578,92.163,123.83,92.665Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M51.088,111.924c.238.451-.428.935-.8.6-2.153-1.949-6.095-4.7-7.207-7.3-1.5-3.5-.681-7.883-3.649-10.715a.548.548,0,0,1,.671-.865c3.28,2.307,2.658,6.824,4.177,10.1C45.82,107.061,49.4,108.733,51.088,111.924Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M29.151,106.816a18.893,18.893,0,0,1-8.33-3.944c-.773-.681.153-1.23.717-.849a19.8,19.8,0,0,0,8.026,3.335,24.719,24.719,0,0,0,8.486-.218c.689-.092.674.916.2,1.2C36.094,107.635,31.571,107.349,29.151,106.816Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M16.436,105.257c-.428-.469.292-1.092.762-.752a29.273,29.273,0,0,0,10.822,5.2c3.068.7,2.217,2.136-.537,1.568A20.592,20.592,0,0,1,16.436,105.257Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M28.356,116.215c-3.645-.211-8.693-1.891-11.429-4.289a.546.546,0,0,1,.595-.9c4.159,2.038,6.377,3.073,11.025,3.65C31.245,115.012,31.166,116.378,28.356,116.215Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M44.466,120.881c.733.5-.1,1.731-.847,1.289-3.942-2.321-8.431-.9-12.713-.907a19.75,19.75,0,0,1-11.683-3.583c-.493-.369.05-1.107.571-.868a26.2,26.2,0,0,0,12.641,2.8C36.482,119.367,40.868,118.431,44.466,120.881Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M196.174,180.009c-40.025.487-153.986-.516-178.328-.8-1.568-.018-2.812-1.788-.045-1.8,31.3-.161,131.761-.123,178.315.306C197.949,177.727,197.954,179.987,196.174,180.009Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M119.049,107.657c-8.8,1.4-25.656,10.809-34.835,22.948,8.7-1.317,34.36-1.542,41.734-.677a73,73,0,0,0-9.18-9.33c1.28-1.467,2.484-2.608,3.537-3.612-2.107-1.3-5.571-3.374-7.1-4.088A32.924,32.924,0,0,1,119.049,107.657Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M138.29,117.437a16.778,16.778,0,0,1,2.858,3.8c-3.085,1.768-9.068,5.079-12.679,8.916,3.448.452,5.7,2.125,6.9,7.2.516,2.177,1.228,5.67,1.934,9.591a119.757,119.757,0,0,1,19.854-2.625,36.256,36.256,0,0,0-4.659-8.42c-.412-.545.352-1.237.807-.708a27.985,27.985,0,0,1,5.289,9.068,61.431,61.431,0,0,1,8.979.127c.68.077.688,1.094-.016,1.077a119.46,119.46,0,0,0-30.014,2.828c1.005,5.732,1.951,12.137,2.248,16.622,15.5-.151,40.646,7.508,44.543-1.731,8.728-20.691-17.78-53.348-36.641-56.207a19.542,19.542,0,0,1,3.273,7.374C148.9,115.066,141,116.947,138.29,117.437Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M126.687,123.307c-3.17-7.911-3.084-12.122-3.988-16a.528.528,0,0,0-1.049.109c-.032,4.681,2.353,12.478,4.29,16.961a.793.793,0,0,0,1.271.15c6.273-8.711,9.407-11.858,16.6-17.445a.53.53,0,0,0-.579-.887A56.107,56.107,0,0,0,126.687,123.307Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M75.686,131.508c-6.17-3.762-16.629-13.017-20.917-18.872a87.532,87.532,0,0,0-11.437,14.433C51.138,138.581,63.5,151,71.247,154.608c-.9-3.838-1.129-14.447-.9-17.833S73.128,132.035,75.686,131.508Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M40.331,131.333c1.914-.08.93-1.422.114-1.438-10.9-.214-22.582-.48-30.8-.352.635-47.487.255-77.45.515-104.207.007-.709-1.056-.6-1.088.075-1.038,21.753-.4,80.333-1.2,103.97-.028.81.028,1.327,1.78,1.405,4.907.22,9.689.229,14.624.314C28.811,131.179,35.936,131.517,40.331,131.333Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M159.749,84.2c.481-9.75.331-19.629.375-29.4.026-5.776.288-21.284.223-28.895-.011-1.318-1.37-.567-1.384.1-.263,12.923-.944,45.191-.45,58.209C158.555,85.31,159.7,85.294,159.749,84.2Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M25.446,54.4c0-3.17.027-6.338,0-9.508,14.278-.082,28.565-.163,42.841-.421.012,2.774,0,5.548,0,8.322-13.637.349-27.582.863-41.26,1.108-.881.016-.738,1.332.114,1.343,13.811.167,28.046-.714,41.9-1.073a.713.713,0,0,0,.638-.755c0-3.239-.011-6.479.011-9.718a.719.719,0,0,0-.762-.642c-14.751.009-29.512.21-44.263.407a.733.733,0,0,0-.656.777c.082,3.42.256,6.832.374,10.25C24.4,55.185,25.445,55.087,25.446,54.4Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M24.614,77.257c14.912-.582,30.265-.65,45.086-1.671a.731.731,0,0,0,.736-.862c-.262-2.114-.525-4.228-.8-6.34-.115-.877-1.431-.577-1.335.284.2,1.835.422,3.669.64,5.5-14.478.611-29.084,1.024-43.5,1.486,0-2.867-.015-5.738.066-8.6,14.575-.151,28.9-.387,43.635-.267a.548.548,0,0,0,.055-1.094c-14.792-.681-29.646-.381-44.5-.351a.874.874,0,0,0-.92.832c.123,3.413.077,6.838.089,10.255A.8.8,0,0,0,24.614,77.257Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M68.473,97.283c-7.16.095-16.269-.047-23.614.3-.615.029-.587,1.283.016,1.293,6.613.113,16.621-.214,24.266-.053.845.018.884-.8.785-1.408a29.182,29.182,0,0,1-.079-9.02.735.735,0,0,0-.743-.871c-14.548.344-29.1.882-43.647,1.115a.758.758,0,0,0-.706.779c-.026,3.148-.02,6.3-.042,9.444a.8.8,0,0,0,.824.747c4.2-.154,7.507-.131,11.708-.39.7-.043.641-1.306-.053-1.308-3.938-.011-6.975.032-10.912.114-.015-2.641-.018-5.282-.036-7.923,14.022-.5,28.055-.72,42.08-1.112A30.4,30.4,0,0,0,68.473,97.283Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M102.468,106.607c.662.157.842-.906.2-1.094a28.57,28.57,0,0,1-16.4-13.525c-8.131-14.522-3.1-33.553,10.11-43.207,11.7-8.551,36.834-8.377,44.938,5.6.49.845,1.763.383,1.355-.516C136.335,39.9,110.619,37.9,98.008,45.6c-14.849,9.07-21.736,28.686-14.38,44.763C87.328,98.451,94.2,104.649,102.468,106.607Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M159.632,109.534c.254-2.156.028-7.9.037-11.261,0-1.206-1.132-.763-1.173-.258a96.034,96.034,0,0,0-.03,11.521C158.511,110.109,159.566,110.1,159.632,109.534Z" fill="#38a1ff" fillRule="evenodd"></path>
                <path d="M163.218,168.678c-5.969-.7-18.347-1.467-26.385-1.6,0-4.615-4.414-31-7.223-33.207-2.69-2.114-53.722-2.508-55.829,1.5-2.77,5.276,1.808,37.962,4.336,38.825,4.113,1.4,82.289,1.167,85.7.9C165.6,174.961,165.854,168.985,163.218,168.678ZM89.534,137.019c-2.964.31-5.8.72-8.756,1.153-2.559.375-2.74.911-3.018,3.367a70.211,70.211,0,0,0-.506,8.789c0,.625-.909.789-.992.131a42.168,42.168,0,0,1,.076-10.14c.286-2.208,1.1-3.2,3.3-3.649a41.083,41.083,0,0,1,9.889-.776A.569.569,0,0,1,89.534,137.019ZM102.6,159.348c-2.115.4-4.406-.744-5.231-3.97-.717-2.8.6-4.913,2.926-5.508C105.865,148.446,107.9,158.335,102.6,159.348Z" fillRule="evenodd" fill="#191919"></path>
                <path d="M160.42,92.586c-9.51-9.423-3.841-22.634-9.923-29.027a7.138,7.138,0,0,0-9.169-1.1c-4.685-7.619-14.241-9.463-22.377-6.928-8.867,2.763-12.044,13.588-4.926,17.072,3.73,1.826,16.825,1.981,20.919,1.188a18.284,18.284,0,0,0,3.661,9.329c.212.255.508.608.86.3a3.7,3.7,0,0,1,5.426.514,3.855,3.855,0,0,1-1.047,5.363c-1.223.809-2.095.691-3.465.622-.429-.021-.509.338-.538.666-.423,4.764-.892,10.2-.165,14.938a.51.51,0,0,0,1.013-.116c.01-1.284-.038-2.568-.08-3.853,6.695.749,15.172-3.167,19.831-7.644C161.178,93.209,160.65,92.814,160.42,92.586ZM124.4,59.99a10.1,10.1,0,0,0-4.707,1.069c-1.621.778-4.373,2.712-4.188,4.74.055.608-.819.98-1.046.353-1.095-3.022,1.953-5.383,3.985-6.492a12.4,12.4,0,0,1,5.9-1.515C126.982,58.148,125.893,60.053,124.4,59.99Z" fillRule="evenodd" fill="#191919"></path>
              </svg>
            </div>

            <div className="flex flex-col rounded-xl border p-4 dark:border-gray-700 sm:p-6 lg:p-8">
              <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-gray-200">Fill in the form</h2>

              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="fullname" className="sr-only">Full Name</label>
                    <input type="text" name="fullname" id="fullname"
                      className="block w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                      placeholder="Full Name"
                      value={formik.values.fullname}
                      onChange={formik.handleChange} />
                  </div>

                  <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input type="email" name="email" id="email" autoComplete="email"
                      className="block w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="sr-only">Subject</label>
                    <input type="text" name="subject" id="subject"
                      className="block w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                      placeholder="Subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange} />
                  </div>

                  <div>
                    <label htmlFor="content" className="sr-only">Details</label>
                    <textarea id="content" name="content" rows="4" className="block w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
                      placeholder="Feedback Details"
                      value={formik.values.content}
                      onChange={formik.handleChange} />
                  </div>
                </div>

                <div className="mt-4 grid">
                  <button type="submit" className="inline-flex items-center justify-center gap-x-3 rounded-md border border-transparent bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 lg:text-base">Send Feedback</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie?.split('token=')[1];

  if (!token) {
    return {
      redirect: {
        destination: 'auth/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
