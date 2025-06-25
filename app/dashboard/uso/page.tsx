/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import React from 'react'
import { FiltrosUso } from '@/components/filtrosUsos'
import FastDataCard  from '@/components/dataCardUsos'

export default function UsoPage() {
  return (
    <div className="px-8 space-y-6 mt-7 pb-11">
        <h1 className="text-4xl font-bold pr-4 pl-5">Uso</h1>
        <FiltrosUso />

        <div className="bg-white border border-neutral-200 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Resumen de uso</h2>
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                    <th className="pb-2">Producto</th>
                    <th className="pb-2">Uso</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-neutral-100">
                    <td className="py-2">Fast Data Transfer</td>
                    <td className="py-2">1.02 MB / 100 GB</td>
                </tr>
                <tr className="border-b border-neutral-100">
                    <td className="py-2">Fast Origin Transfer</td>
                    <td className="py-2">167.05 kB / 10 GB</td>
                </tr>
                <tr className="border-b border-neutral-100">
                    <td className="py-2">Edge Requests</td>
                    <td className="py-2">58 / 1M</td>
                </tr>
                <tr className="border-b border-neutral-100">
                    <td className="py-2">Edge CPU Duration</td>
                    <td className="py-2">0 s / 1h</td>
                </tr>
                <tr>
                    <td className="py-2">ISR Reads</td>
                    <td className="py-2">5 / 1M</td>
                </tr>
                </tbody>
            </table>
        </div>
        </div>
        <FastDataCard/>
    </div>
  )
}

