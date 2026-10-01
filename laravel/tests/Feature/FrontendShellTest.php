<?php

namespace Tests\Feature;

use Tests\TestCase;

class FrontendShellTest extends TestCase
{
    public function test_homepage_provides_the_react_mount_point(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertSee('<div id="app"></div>', false);
    }
}
