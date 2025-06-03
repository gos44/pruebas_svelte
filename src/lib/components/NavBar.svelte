<!-- src/lib/components/NavBar.svelte -->
<script lang="ts">
    import { page } from '$app/stores';
    
    let isMenuOpen = false;
    
    type Link = { href: string; label: string; className?: string };
const mainLinks: Link[] = [ 
    { href: '/', label: 'Inicio' },
    { href: '/formulario', label: 'Formulario' },
    { href: '/Metricas', label: 'Metricas' },
    { href: '/tareas', label: 'Tareas' },
    { href: '/sobre-Componentes', label: 'Sobre Componentes' }
 ];
    
    const authLinks = [
    { href: 'api/login', label: 'Iniciar sesión', className: 'login-btn' },
    { href: 'api/signup', label: 'Registrarse', className: 'register-btn' }
];
    
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
    };

    
</script>

<nav class="navbar">
    <div class="nav-container">
        <a href="/" class="logo">Mi Sitio</a>
        
        <!-- Menú para desktop -->
        <div class="desktop-menu">
            <ul class="nav-links">
                {#each mainLinks as { href, label }}
                    <li>
                        <a href={href} class:active={$page.url.pathname === href}>{label}</a>
                    </li>
                {/each}
            </ul>
            
            <div class="auth-buttons">
                {#each authLinks as { href, label, className }}
                    <a href={href} class={className}>{label}</a>
                {/each}
            </div>
        </div>
        
        <!-- Menú móvil -->
        <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                {#if isMenuOpen}
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                {:else}
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                {/if}
            </svg>
        </button>
    </div>
    
    <!-- Menú desplegable móvil -->
    {#if isMenuOpen}
        <div class="mobile-menu">
            <ul>
            {#each [...mainLinks, ...authLinks] as link}
                <li>
                <a
            href={link.href}
            class={link.className ?? ''}
            class:active={$page.url.pathname === link.href}
            on:click={() => isMenuOpen = false}
            >
            {link.label}
        </a>
    </li>
{/each}
            </ul>
        </div>
    {/if}
</nav>

<style>
    :global(body) {
        margin: 0;
        font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .navbar {
        background-color: #ffffff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 1000;
    }
    
    .nav-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2563eb;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .desktop-menu {
        display: flex;
        align-items: center;
        gap: 2rem;
    }
    
    .nav-links {
        display: flex;
        list-style: none;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
    }
    
    .nav-links a {
        text-decoration: none;
        color: #4b5563;
        font-weight: 500;
        transition: all 0.2s ease;
        position: relative;
        padding: 0.5rem 0;
    }
    
    .nav-links a:hover {
        color: #2563eb;
    }
    
    .nav-links a.active,
    .nav-links a[class~="active"] {
        color: #2563eb;
        font-weight: 600;
    }
    
    .nav-links a.active::after,
    .nav-links a[class~="active"]::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #2563eb;
        border-radius: 2px;
    }
    
    .auth-buttons {
        display: flex;
        gap: 1rem;
        margin-left: 1rem;
    }
    
    .login-btn {
        padding: 0.5rem 1.25rem;
        border-radius: 0.375rem;
        font-weight: 500;
        color: #2563eb;
        background-color: transparent;
        border: 1px solid #2563eb;
        text-decoration: none;
        transition: all 0.2s ease;
    }
    
    .login-btn:hover {
        background-color: rgba(37, 99, 235, 0.05);
    }
    
    .register-btn {
        padding: 0.5rem 1.25rem;
        border-radius: 0.375rem;
        font-weight: 500;
        color: white;
        background-color: #2563eb;
        border: 1px solid #2563eb;
        text-decoration: none;
        transition: all 0.2s ease;
    }
    
    .register-btn:hover {
        background-color: #1d4ed8;
        border-color: #1d4ed8;
    }
    
    .menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        color: #4b5563;
    }
    
    .mobile-menu {
        display: none;
        background-color: white;
        padding: 1rem 2rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .mobile-menu a {
        display: block;
        padding: 0.75rem 0;
        text-decoration: none;
        color: #4b5563;
        font-weight: 500;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .mobile-menu a.active {
        color: #2563eb;
        font-weight: 600;
    }
    
    .mobile-menu .login-btn,
    .mobile-menu .register-btn {
        display: inline-block;
        margin-top: 0.5rem;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .desktop-menu {
            display: none;
        }
        
        .menu-toggle {
            display: block;
        }
        
        .mobile-menu {
            display: block;
        }
        
        .nav-container {
            padding: 0 1rem;
        }
    }
</style>