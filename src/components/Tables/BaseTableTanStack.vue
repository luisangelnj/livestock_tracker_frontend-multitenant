<script setup>
import { useVueTable, getCoreRowModel } from '@tanstack/vue-table'
import { EyeIcon } from '@heroicons/vue/24/solid';

// Props que recibe el componente
const props = defineProps({
  data: Array, // Lista de datos a mostrar
  columns: Array, // Columnas de la tabla
  isLoading: Boolean, // Estado de carga
  page: Number, // Página actual
  totalPages: Number, // Total de páginas
  nextPage: Function, // Función para avanzar de página
  previousPage: Function // Función para retroceder de página
})

// Configuración de la tabla
const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(), // Añade el modelo de filas básico
  manualPagination: true,
  pageCount: props.totalPages
})
</script>

<template>
    <div class="overflow-auto w-full">
        <!-- Tabla con estilos de Tailwind -->
        <table class="min-w-full bg-white shadow-sm rounded-t-lg">
        <thead class="bg-primary/35">
            <tr class="rounded-lg divide-x-2 divide-primary/10">
            <!-- Encabezados de la tabla -->
            <th
                v-for="header in table.getFlatHeaders()"
                :key="header.id"
                class="px-6 py-4 text-left text-xs font-bold text-primary uppercase tracking-wider first:rounded-tl-lg"
                :style="{ width: header.column.columnDef.width + '%' }"
            >
                {{ header.column.columnDef.header }}
            </th>
            <th class="px-6 py-4 text-start text-xs font-bold text-primary uppercase tracking-wider w-[10%] last:rounded-tr-lg">
                Acción
            </th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 font-medium">
            <tr v-if="searching">
            <td :colspan="table.getFlatHeaders().length + 1" class="px-6 py-3 text-center text-gray-500">
                <div role="status" class="flex justify-center">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </td>
            </tr>
            <!-- Mostrar mensaje si no hay registros -->
            <tr v-else-if="data.length == 0">
            <td :colspan="table.getFlatHeaders().length + 1" class="px-6 py-3 text-center text-gray-500 text-sm">
                No hay registros disponibles.
            </td>
            </tr>
            <!-- Filas de la tabla -->
            <tr
            v-else-if="data.length > 0"
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="hover:bg-gray-50 transition-colors divide-x-2 divide-gray-2 hover:divide-gray-100"
            >
            <!-- Celdas de la tabla -->
            <td
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="px-6 py-3 text-sm text-gray-700"
            >
                {{ cell.getValue() }}
            </td>
            <td class="px-6 py-3 text-sm text-primary text-center">
                <router-link to="#"><span class="cursor-pointer" title:="Ver detalle"><EyeIcon class="size-5"/></span></router-link>
            </td>
            </tr>
        </tbody>
        </table>

        <!-- Controles de paginación -->
        <div class="flex justify-end items-center mt-4 space-x-2 select-none">
        <button
            @click="previousPage"
            :disabled="page == 1 ||  searching"
            class="px-4 py-2 bg-gray-200 rounded-lg enabled:hover:bg-gray-300 disabled:opacity-40"
        >
            &lt;
        </button>
        <span class="text-sm text-gray-700">
            {{ page }} de {{ totalPages }}
        </span>
        <button
            @click="nextPage"
            :disabled="page >= totalPages || searching"
            class="px-4 py-2 bg-gray-200 rounded-lg enabled:hover:bg-gray-300 disabled:opacity-40"
        >
            &gt;
        </button>
        </div>

    </div>
</template>

